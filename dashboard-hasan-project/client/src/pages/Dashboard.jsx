import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "../components/Table.jsx";

export default function DashboardPage() {
	const karyawan = {
		head: ["", "Nama Lengkap", "Kota/Tanggal Lahir", "Email"],
		body: [
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
		],
	};
	const kontraktor = {
		head: ["", "Nama Lengkap", "Perusahaan", "Email"],
		body: [
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
		],
	};
	return (
		<Container
			style={{
				maxWidth: "659px",
				padding: "1rem 0.5rem",
				marginInline: "auto",
			}}
		>
			<CardTable
				title="Karyawan"
				tableData={karyawan}
				expandRoute="/karyawan"
			/>
			<CardTable
				title="Kontraktor"
				tableData={kontraktor}
				expandRoute="/kontraktor"
			/>
		</Container>
	);
}

function CardTable({ title, tableData, expandRoute }) {
	return (
		<Card className="mb-2">
			<Card.Header>{title}</Card.Header>
			<Card.Body className="pt-0 pe-0 ps-0 pb-1">
				<Table tableData={tableData} />
				<Card.Link as={Link} to={expandRoute} className="btn btn-primary m-2">
					Lihat Rincian
				</Card.Link>
			</Card.Body>
		</Card>
	);
}
