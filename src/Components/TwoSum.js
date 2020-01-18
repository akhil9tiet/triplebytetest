import React from 'react';

const TwoSum = (nums, target) => {
	var diff = {};

	for (let i = 0; i < nums.legth; i++) {
		if (nums[i] > target) {
			continue;
		} else {
			console.log("diff",diff);
			diff.i = target - nums[i];
		}
	}

	for (let i = 0; i < nums.length; i++) {
		if (diff[i] === nums[i]) {
			return <p>{helo}</p>;
		}
	}
};

export default TwoSum;
