import {Mongo} from 'meteor/mongo';
import {Partitioner} from 'meteor/mizzao:partitioner';

export const Posts = new Mongo.Collection('posts');
export const Comments = new Mongo.Collection('comments');
export const Customer = new Mongo.Collection('customer');
export const WorkOrder = new Mongo.Collection('work_order');
var a = new Mongo.Collection('workbench_contact_mapper');
Partitioner.partitionCollection(a);
export const WorkBenchContactMapper = a;
