import { z } from "zod";
import { Button } from "./ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, createProduct } from "@/data/products";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";


const createProductSchema = z.object({
	name: z.string(),
	price: z.coerce.number(),
});

type CeateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {

	const [searchParams] = useSearchParams()

	const id = searchParams.get('id')
	const name = searchParams.get('name')

	const queryClient = useQueryClient();

	const { register, handleSubmit } = useForm<CeateProductSchema>({
		resolver: zodResolver(createProductSchema),
	});

	const { mutateAsync: createProductFn } = useMutation({
		mutationFn: createProduct,
		onSuccess(responseFromAPI) {
			queryClient.setQueryData<Product[]>(["products", id, name], (data) => {
				if (!data) {
					return;
				}
				return [...data, responseFromAPI];
			});
		},
	});

	async function handleCreateProduct(data: CeateProductSchema) {
		try {
			await createProductFn({
				name: data.name,
				price: data.price,
			});
			toast.success("Cadastrado com sucesso!");
		} catch (err) {
			toast.error("Error ao cadatrar produto!");
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Novo Produto</DialogTitle>
				<DialogDescription>
					Criar um novo produto no sistema
				</DialogDescription>
			</DialogHeader>
			<form
				action=""
				className="space-y-6"
				onSubmit={handleSubmit(handleCreateProduct)}
			>
				<div className="grid grid-cols-4 items-center text-right gap-3">
					<Label htmlFor="name">Produto</Label>
					<Input
						{...register("name")}
						className="col-span-3"
						id="name"
					></Input>
				</div>
				<div className="grid grid-cols-4 items-center text-right gap-3">
					<Label htmlFor="price">Preço</Label>
					<Input
						className="col-span-3"
						{...register("price")}
						id="price"
					></Input>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Cancelar
						</Button>
					</DialogClose>
					<Button type="submit">Salvar</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
