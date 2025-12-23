import { FieldErrors, UseFormRegister } from "react-hook-form";
import { supplierPjFormData } from '@/types/supplier'

interface Props {
	register: UseFormRegister<supplierPjFormData>;
	errors: FieldErrors<supplierPjFormData>;
}

export default function SupplierPJForm({ register, errors }: Props) {
	return (
		<>
			<label className="text-sm font-medium">CNPJ</label>
			<input
				className="border px-3 py-2 rounded"
				{...register("cnpj")} />
			{errors.cnpj?.message}
		</>
	);
}
