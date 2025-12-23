import supplierService from "@/services/supplierService";
import { useSuppliersStore } from "@/store/supplierStore";
import {
	supplierPfFormData,
	supplierPjFormData,
	supplierSchema,
} from "@/types/supplier";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SupplierPFForm from "./supplierPfForm";
import SupplierPJForm from "./supplierPjForm";

interface Props {
	setIsFormActive: (state: boolean) => void;
}

export default function InsertSupplier({ setIsFormActive }: Props) {
	const { setAllSuppliers } = useSuppliersStore();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<supplierPfFormData | supplierPjFormData>({
		resolver: zodResolver(supplierSchema),
		defaultValues: {
			type: "PF",
		},
	});

	const typeForm = watch("type");

	async function onSubmit(data: supplierPfFormData | supplierPjFormData) {
		if (data.type === "PF") {
			await supplierService.insertPf(data);
		} else {
			await supplierService.insertPj(data);
		}

		setIsFormActive(false);
		const suppliers = await supplierService.getAll();
		setAllSuppliers(suppliers.content);
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

			<form className="flex flex-col gap-3 bg-white rounded-xl p-6 shadow-xl w-[300px]" onSubmit={handleSubmit(onSubmit)}>
				<label className="text-sm font-medium">Tipo</label>
				<select className="border px-3 py-2 rounded" {...register("type")}>
					<option value="PF">Pessoa Física</option>
					<option value="PJ">Pessoa Jurídica</option>
				</select>

				<label className="text-sm font-medium">Nome</label>
				<input
					className="border px-3 py-2 rounded"
					{...register("name")} />
				{errors.name?.message}

				<label className="text-sm font-medium">Email</label>
				<input
					className="border px-3 py-2 rounded"
					{...register("email")} />
				{errors.email?.message}

				{typeForm === "PF" && (
					<SupplierPFForm
						register={register as any}
						errors={errors as any}
					/>
				)}

				{typeForm === "PJ" && (
					<SupplierPJForm
						register={register as any}
						errors={errors as any}
					/>
				)}

				<label className="text-sm font-medium">CEP</label>
				<input
					className="border px-3 py-2 rounded"
					{...register("cep")} />
				{errors.cep?.message}

				<div className="flex gap-4 pt-2">
					<button
						type="submit"
						className="h-10 flex-1 bg-green-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
					>
						Confirmar
					</button>

					<button
						type="button"
						className="h-10 flex-1 bg-red-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
						onClick={() => setIsFormActive(false)}
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
}
