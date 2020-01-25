import React from 'react';

const TwoSum = ({ nums, target }) => {
	// console.log('nums', props.nums);
	// console.log('target', props.target);
	var diffObj = {};

	for (let i = 0; i < nums.length; i++) {
		const diff = target - nums[i];
		diffObj[diff] = i;
	}
	// console.log(diffObj);
	// console.log(diffObj);
	const resultArr = [];
	for (let j = 0; j < nums.length; j++) {
		const num = nums[j];
		if (diffObj.hasOwnProperty(nums[j]) && diffObj[num] !== j) {
			resultArr.push([j, diffObj[num]]);
		}
	}
	// console.log(resultArr)
	return <p>Hellow</p>;
};

export default TwoSum;
