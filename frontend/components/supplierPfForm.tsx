import { FieldErrors, UseFormRegister } from "react-hook-form";
import { supplierPfFormData } from "@/types/supplier";

interface Props {
	register: UseFormRegister<supplierPfFormData>;
	errors: FieldErrors<supplierPfFormData>;
}

export default function SupplierPFForm({ register, errors }: Props) {
	return (
		<>
			<label className="text-sm font-medium">CPF</label>
			<input
				className="border px-3 py-2 rounded"
				{...register("cpf")} />
			{errors.cpf?.message}

			<label className="text-sm font-medium">RG</label>
			<input
				className="border px-3 py-2 rounded"
				{...register("rg")} />
			{errors.rg?.message}

			<label className="text-sm font-medium">Data de nascimento</label>
			<input
				className="border px-3 py-2 rounded"
				type="date" {...register("birthDate", {valueAsDate: true})} />
			{errors.birthDate?.message}
		</>
	);
}
