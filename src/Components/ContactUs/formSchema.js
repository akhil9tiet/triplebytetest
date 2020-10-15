export const formSchema = [
	{
		order: 1,
		field: 'first_name',
		display_name: 'First name',
		type: 'string',
		required: true,
	},
	{
		order: 2,
		field: 'last_name',
		display_name: 'Last name',
		type: 'string',
		required: true,
	},
	{
		order: 3,
		field: 'age',
		display_name: 'Age',
		type: 'number',
		required: false,
	},
	{
		order: 4,
		field: 'user_type',
		display_name: 'User Type',
		type: 'select',
		required: false,
		options: ['shareholder', 'investor', 'other'],
	},
];
