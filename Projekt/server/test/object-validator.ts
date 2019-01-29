import { expect } from 'chai';
import 'mocha';

import { ObjectValidator, NewObjectValidator } from '../src/util/object-validator';
import { ApiError, ErrorNumber } from '../src/types';

describe('object-validator', () => {
    let validator: NewObjectValidator<any>;
    before(async () => {
        validator = new NewObjectValidator<any>({
            type: Object,
            required: true,
            properties: {
                nickname: {
                    type: String
                },
                username: {
                    type: String,
                    required: true,
                    range: {
                        min: 3,
                        max: 32
                    }
                },
                hidden: {
                    type: Boolean,
                    nullable: true
                },
                pets: {
                    type: Array,
                    elements: {
                        type: Object,
                        required: true,
                        properties: {
                            name: {
                                type: String,
                                required: true
                            },
                            animal: {
                                type: String,
                                enum: ['cat', 'dog', 'cow']
                            }
                        }
                    }
                },
                address: {
                    type: Object,
                    properties: {
                        street: {
                            type: String,
                            required: true
                        },
                        city: {
                            type: String,
                            required: true,
                            validator: (value: string, path: string) => {
                                if (value.match(/[0-9]/g)) {
                                    throw ApiError.BAD_REQUEST(ErrorNumber.REQUEST_FIELD_STRING_FORMAT, path);
                                }
                            }
                        },
                        zip: {
                            type: Number,
                            required: true,
                            range: {
                                min: 10000,
                                max: 99999
                            }
                        }
                    }
                }
            }
        });
    });

    describe('valid objects', () => {
        it('complete object', done => {
            validator.validate({
                nickname: 'Nickname',
                username: 'Username',
                hidden: true,
                pets: [
                    {
                        name: 'Name1',
                        animal: 'cat'
                    },
                    {
                        name: 'Name2',
                        animal: 'dog'
                    }
                ],
                address: {
                    street: 'Street',
                    city: 'City',
                    zip: 10000,
                }
            });
            done();
        });
        it('incomplete object', done => {
            validator.validate({
                username: 'Username',
                hidden: null,
                address: {
                    street: 'Street',
                    city: 'City',
                    zip: 10000,
                }
            });
            done();
        });
    });

    describe('invalid objects', () => {
        it('missing field', done => {
            let error;
            try {
                validator.validate({
                    address: {
                        street: 'Street',
                        city: 'City',
                        zip: 10000,
                    }
                });
            } catch (err) {
                error = err;
            }
            expect(error).to.be.instanceOf(ApiError);
            expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_MISSING);
            expect(error.cause).to.equal('_root.username');
            done();
        });

        it('null field', done => {
            let error;
            try {
                validator.validate({
                    username: null,
                    address: {
                        street: 'Street',
                        city: 'City',
                        zip: 10000,
                    }
                });
            } catch (err) {
                error = err;
            }
            expect(error).to.be.instanceOf(ApiError);
            expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_NULL);
            expect(error.cause).to.equal('_root.username');
            done();
        });

        it('wrong type boolean', done => {
            let error;
            try {
                validator.validate({
                    username: 'Username',
                    hidden: 'true',
                    address: {
                        street: 'Street',
                        city: 'City',
                        zip: 10000,
                    }
                });
            } catch (err) {
                error = err;
            }
            expect(error).to.be.instanceOf(ApiError);
            expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_TYPE);
            expect(error.cause.path).to.equal('_root.hidden');
            expect(error.cause.expected).to.equal('boolean');
            done();
        });

        describe('number fields', () => {
            it('wrong type', done => {
                let error;
                try {
                    validator.validate({
                        username: 'Username',
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: '10000',
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_TYPE);
                expect(error.cause.path).to.equal('_root.address.zip');
                expect(error.cause.expected).to.equal('number');
                done();
            });
            it('too small', done => {
                let error;
                try {
                    validator.validate({
                        username: 'Username',
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: 1,
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_MIN);
                expect(error.cause.path).to.equal('_root.address.zip');
                expect(error.cause.expected).to.equal(10000);
                done();
            });
            it('too big', done => {
                let error;
                try {
                    validator.validate({
                        username: 'Username',
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: 100000,
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_MAX);
                expect(error.cause.path).to.equal('_root.address.zip');
                expect(error.cause.expected).to.equal(99999);
                done();
            });
        });

        describe('string fields', () => {
            it('wrong type', done => {
                let error;
                try {
                    validator.validate({
                        username: 123,
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: 10000,
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_TYPE);
                expect(error.cause.path).to.equal('_root.username');
                expect(error.cause.expected).to.equal('string');
                done();
            });
            it('length min', done => {
                let error;
                try {
                    validator.validate({
                        username: 'U',
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: 10000,
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_LENGTH);
                expect(error.cause.path).to.equal('_root.username');
                expect(error.cause.expected.min).to.equal(3);
                done();
            });
            it('length max', done => {
                let error;
                try {
                    validator.validate({
                        username: 'UsernameUsernameUsernameUsernameUsername',
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: 10000,
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_LENGTH);
                expect(error.cause.path).to.equal('_root.username');
                expect(error.cause.expected.max).to.equal(32);
                done();
            });
            it('enum value', done => {
                let error;
                try {
                    validator.validate({
                        username: 'Username',
                        pets: [
                            {
                                name: 'Name',
                                animal: 'Animal'
                            }
                        ],
                        address: {
                            street: 'Street',
                            city: 'City',
                            zip: 10000,
                        }
                    });
                } catch (err) {
                    error = err;
                }
                expect(error).to.be.instanceOf(ApiError);
                expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_ENUM);
                expect(error.cause.path).to.equal('_root.pets.[0].animal');
                expect(error.cause.expected).to.be.an('array');
                done();
            });
        });

        it('custom validator error', done => {
            let error;
            try {
                validator.validate({
                    username: 'Username',
                    address: {
                        street: 'Street',
                        city: 'City1',
                        zip: 10000,
                    }
                });
            } catch (err) {
                error = err;
            }
            expect(error).to.be.instanceOf(ApiError);
            expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_STRING_FORMAT);
            expect(error.cause).to.equal('_root.address.city');
            done();
        });

        it('wrong type array', done => {
            let error;
            try {
                validator.validate({
                    username: 'Username',
                    pets: 'Pets',
                    address: {
                        street: 'Street',
                        city: 'City',
                        zip: 10000,
                    }
                });
            } catch (err) {
                error = err;
            }
            expect(error).to.be.instanceOf(ApiError);
            expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_TYPE);
            expect(error.cause.path).to.equal('_root.pets');
            expect(error.cause.expected).to.equal('array');
            done();
        });

        it('wrong type object', done => {
            let error;
            try {
                validator.validate({
                    username: 'Username',
                    address: 'Address'
                });
            } catch (err) {
                error = err;
            }
            expect(error).to.be.instanceOf(ApiError);
            expect(error.errorNumber).to.equal(ErrorNumber.REQUEST_FIELD_TYPE);
            expect(error.cause.path).to.equal('_root.address');
            expect(error.cause.expected).to.equal('object');
            done();
        });
    });
});