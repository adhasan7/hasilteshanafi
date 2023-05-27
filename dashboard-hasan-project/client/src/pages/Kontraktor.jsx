import Container from "react-bootstrap/Container";
import Table from "../components/Table.jsx";

export default function KontraktorPage() {
	const kontraktor = {
		head: ["", "Nama Lengkap", "Perusahaan", "Email"],
		body: [
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
			[1, "A.D Hasan", "PT Sanjaya", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Amazon", "bani@gmail.com"],
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
			<Table tableData={kontraktor} />
		</Container>
	);
}
