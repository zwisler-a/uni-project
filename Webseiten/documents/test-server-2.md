---
layout: page
permalink: /documents/test-server/2/
---

```
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Mocha Tests" time="0.163" tests="18" failures="0">
  <testsuite name="Root Suite" timestamp="2019-01-24T23:06:46" tests="0" failures="0" time="0">
  </testsuite>
  <testsuite name="authentication" timestamp="2019-01-24T23:06:46" tests="3" failures="0" time="0.16">
    <testcase name="authentication valid credentials" time="0.092" classname="valid credentials">
    </testcase>
    <testcase name="authentication invalid credentials username" time="0.005" classname="invalid credentials username">
    </testcase>
    <testcase name="authentication invalid credentials password" time="0.063" classname="invalid credentials password">
    </testcase>
  </testsuite>
  <testsuite name="object-validator" timestamp="2019-01-24T23:06:46" tests="0" failures="0" time="0">
  </testsuite>
  <testsuite name="valid objects" timestamp="2019-01-24T23:06:46" tests="2" failures="0" time="0.001">
    <testcase name="object-validator valid objects complete object" time="0.001" classname="complete object">
    </testcase>
    <testcase name="object-validator valid objects incomplete object" time="0" classname="incomplete object">
    </testcase>
  </testsuite>
  <testsuite name="invalid objects" timestamp="2019-01-24T23:06:46" tests="6" failures="0" time="0.001">
    <testcase name="object-validator invalid objects missing field" time="0" classname="missing field">
    </testcase>
    <testcase name="object-validator invalid objects null field" time="0" classname="null field">
    </testcase>
    <testcase name="object-validator invalid objects wrong type boolean" time="0" classname="wrong type boolean">
    </testcase>
    <testcase name="object-validator invalid objects custom validator error" time="0.001" classname="custom validator error">
    </testcase>
    <testcase name="object-validator invalid objects wrong type array" time="0" classname="wrong type array">
    </testcase>
    <testcase name="object-validator invalid objects wrong type object" time="0" classname="wrong type object">
    </testcase>
  </testsuite>
  <testsuite name="number fields" timestamp="2019-01-24T23:06:46" tests="3" failures="0" time="0">
    <testcase name="object-validator invalid objects number fields wrong type" time="0" classname="wrong type">
    </testcase>
    <testcase name="object-validator invalid objects number fields too small" time="0" classname="too small">
    </testcase>
    <testcase name="object-validator invalid objects number fields too big" time="0" classname="too big">
    </testcase>
  </testsuite>
  <testsuite name="string fields" timestamp="2019-01-24T23:06:46" tests="4" failures="0" time="0.001">
    <testcase name="object-validator invalid objects string fields wrong type" time="0" classname="wrong type">
    </testcase>
    <testcase name="object-validator invalid objects string fields length min" time="0" classname="length min">
    </testcase>
    <testcase name="object-validator invalid objects string fields length max" time="0" classname="length max">
    </testcase>
    <testcase name="object-validator invalid objects string fields enum value" time="0.001" classname="enum value">
    </testcase>
  </testsuite>
</testsuites>
```