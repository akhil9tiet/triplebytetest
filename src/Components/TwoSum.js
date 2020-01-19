import React from 'react';

const TwoSum = (props) => {
	console.log('nums', props.nums);
	console.log('target', props.target);
	var diffObj = {};

	for (let i=0; i<props.nums.length; i++){
		const diff = props.target - props.nums[i];
		diffObj[diff] = i;
	}
	// console.log(diffObj);
	// console.log(diffObj);
	const resultArr = [];
	for (let j = 0; j < props.nums.length; j++) {
		const num = props.nums[j];
		if (diffObj.hasOwnProperty(props.nums[j]) && diffObj[num] !== j) {
			 resultArr.push([j, diffObj[num]]);
		}	
	}
	console.log(resultArr)
	return (<p>Hellow</p>);
};

export default TwoSum;
