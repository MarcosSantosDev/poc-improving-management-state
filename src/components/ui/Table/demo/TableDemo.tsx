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
				<Table.Head {...sorting}>
					<Table.HeadColumn
						id="firstName"
						sortable
					>
						First Name
					</Table.HeadColumn>
					<Table.HeadColumn
						id="lastName"
						sortable
					>
						Last Name
					</Table.HeadColumn>
					<Table.HeadColumn id="department">Department</Table.HeadColumn>
					<Table.HeadColumn id="jobTitle">Title</Table.HeadColumn>
					<Table.HeadColumn id="salary">Salario</Table.HeadColumn>
				</Table.Head>

				<Table.Body>
					{/* Show the first 10 sorted items */}
					{showingItems.slice(0, 10).map((item, index) => (
						<Table.Row key={item.id}>
							<Table.CellSuper messageError={index === 2 ? 'Ocorreu um erro nesta célula!' : ''}>
								{item.firstName}
							</Table.CellSuper>
							<Table.Cell>{item.lastName}</Table.Cell>
							<Table.Cell>{item.department}</Table.Cell>
							<Table.Cell>{item.jobTitle}</Table.Cell>
							<Table.CellSuper formatData={(value) => `R$ ${value}`}>{item.salary}</Table.CellSuper>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Table.Pagination {...paging} />
		</div>
	);
};

export default TableDemo;
