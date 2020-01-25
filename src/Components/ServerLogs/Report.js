import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const Report = (props) => {
	// var count = 0;
	const [data, setData] = useState({ data: [], count: 0 });

	const { logs } = props;

	var resultTab = [];

	// logs.map((log) => {
	// 	const logArr = log.split(' ');
	// 	const reqMessage = logArr[2].substring(1);
	// 	const fileName = logArr[3];
	// 	const resCode = logArr[5];
	// 	const bytes = logArr[6];
	// 	if (!logArr.length === 6) {
	// 		return <h1>Error!! there is an error with: {log} </h1>;
	// 	} else {
	// 		if (reqMessage === 'GET') {
	// 			if (resCode[0] === '2') {
	// 				if (count < 10) {
	// 					count++;
	// 					return resultTab.push([fileName, bytes]);
	// 				}
	// 			}
	// 		}
	// 	}
  // });
  
	return (
		<React.Fragment>
			<Table>
				<thead>
					<tr>
						<th>Filename</th>
						<th>Bytes</th>
					</tr>
				</thead>
				<tbody>
					{resultTab.map((row, i) => (
						<tr key={i}>
							<td>{row[0]}</td>
							<td>{row[1]}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</React.Fragment>
	);
};

export default Report;
