import { PopulateOptions } from 'mongoose';

// Define shared populate options for Task model
// Using any[] temporarily to bypass potential complex type issue
// TODO: Investigate and restore PopulateOptions[] if possible
export const populateTaskOptions: any[] = [
  { path: 'category', select: 'name description' }, // Populate category details
  { path: 'assignedTo', select: 'name email' },   // Populate assigned user details
  { path: 'createdBy', select: 'name email' },     // Populate creator user details
  { path: 'board', select: 'name status' }          // Populate board details (NEW)
];
