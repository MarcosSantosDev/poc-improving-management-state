import Table from '@/components/ui/Table';

import { usersMocked } from './tableDemoMock';

const TableDemo = () => {
	const { showingItems, sorting, paging } = Table.useTable(
		usersMocked,
		{
			sortKey: 'firstName',
			sortDir: 'desc',
		},
		{
			totalPages: usersMocked.length,
		}
	);

	return (
		<div>
			<Table minWidth="700px">
				<Table.Header {...sorting}>
					<Table.Column
						id="firstName"
						sortable
					>
						First Name
					</Table.Column>
					<Table.Column
						id="lastName"
						sortable
					>
						Last Name
					</Table.Column>
					<Table.Column id="department">Department</Table.Column>
					<Table.Column id="jobTitle">Title</Table.Column>
					<Table.Column id="salary">Salario</Table.Column>
				</Table.Header>

				<Table.Body>
					{/* Show the first 10 sorted items */}
					{showingItems.slice(0, 10).map((item, index) => (
						<Table.Row key={item.id}>
							<Table.Cell messageError={index === 2 ? 'Ocorreu um erro nesta celula!' : ''}>
								{item.firstName}
							</Table.Cell>
							<Table.Cell>{item.lastName}</Table.Cell>
							<Table.Cell>{item.department}</Table.Cell>
							<Table.Cell>{item.jobTitle}</Table.Cell>
							<Table.Cell formatData={(value) => `R$ ${value}`}>{item.salary}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Table.Paging {...paging} />
		</div>
	);
};

export default TableDemo;
