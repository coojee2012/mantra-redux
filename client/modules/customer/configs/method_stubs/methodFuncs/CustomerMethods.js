/**
 * Created by LinYong on 2016/3/23.
 */
const test = ({Collections, Meteor}, key) => {
  return new Promise((resolve, reject)=> {
    resolve(key);
  });
}

const create = ({Collections, Meteor}, data) => {
  return new Promise((resolve, reject)=> {
    resolve(data);
  });
}
export  {
  test,
  create
};
