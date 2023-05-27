import { default as BootstrapTable } from "react-bootstrap/Table";

export default function Table({ tableData }) {
	return (
		<BootstrapTable bordered hover responsive>
			<thead>
				<tr>
					{tableData.head.map((head, index) => (
						<th key={index}>{head}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{tableData.body.map((data, index) => (
					<tr key={index}>
						{data.map((title) => (
							<td key={title}>{title}</td>
						))}
					</tr>
				))}
			</tbody>
		</BootstrapTable>
	);
}
