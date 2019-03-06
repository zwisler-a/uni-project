/**
 * Represents a file
 * @author Maurice
 */
export interface File {
    /** TypeField.id of file */
    fieldId: number;
    /** Item.id of file */
    itemId: string;
    /** date the file was created */
    timestamp: Date;
    /** files original name */
    name: string;
    /** files mime type */
    mime: string;
}