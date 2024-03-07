import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const productsFilterSchema = z.object({
	id: z.string(),
	name: z.string(),
});

type ProductsFilterSchema = z.infer<typeof productsFilterSchema>;

export function ProductsFilters() {
	const [searchParams, setSearchParams]  = useSearchParams();

	const id = searchParams.get('id')
	const name = searchParams.get('name')



	const { register, handleSubmit } = useForm<ProductsFilterSchema>({
		resolver: zodResolver(productsFilterSchema),
		values: {
			id: id ?? "", 
			name: name ?? "", 
		}
	});

	function handleFilterProducts({ id, name }: ProductsFilterSchema) {
		setSearchParams(state => {
			if (id) state.set("id", id);
			else state.delete("id");

			return state;
		});
		setSearchParams(state => {
			if (name) state.set("name", name);
			else state.delete("name");

			return state;
		});
	}
	return (
		<form
			onSubmit={handleSubmit(handleFilterProducts)}
			className="flex items-center gap-2"
		>
			<Input
				{...register("id")}
				placeholder="ID do pedido"
				className="w-auto"
			/>
			<Input
				{...register("name")}
				placeholder="Nome do produto"
				className="w-auto"
			/>
			<Button type="submit" variant="link">
				<Search className="size-4 mr-2" />
				Filtrar
			</Button>
		</form>
	);
}
