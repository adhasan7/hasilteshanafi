import Container from "react-bootstrap/Container";
import Table from "../components/Table.jsx";

export default function KaryawanPage() {
	const karyawan = {
		head: ["", "Nama Lengkap", "Kota/Tanggal Lahir", "Email"],
		body: [
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
			[1, "A.D Hasan", "Jakarta, 99 Des 9999", "hasan@gmail.com"],
			[2, "Fitrah Nuno Syahbani", "Depok, 27 Nov 2002", "bani@gmail.com"],
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
			<Table tableData={karyawan} />
		</Container>
	);
}
