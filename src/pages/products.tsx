import { ModeToggle } from "../components/mode-toggle";
import { ThemeProvider } from "../components/theme-provider";
import "../App.css";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogTrigger } from "../components/ui/dialog";
import { ProductsFilters } from "../components/products-filters";
import { CreateProductDialog } from "../components/create-product-dialog";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../data/products";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export function Products() {

	const [searchParams] = useSearchParams()

	const id = searchParams.get('id')
	const name = searchParams.get('name')

	const {data: products, } = useQuery({
		queryKey: ['products', id, name],
		queryFn: () => getProducts({
			id, name
		}),
	})
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex justify-end ">
				<ModeToggle />
			</div>
			<div className="p-6 max-w-4xl mx-auto space-y-4">
				<h1 className="text-3xl font-bold flex justify-start">
					Produtos
				</h1>

				<div className="flex items-center justify-between">
					<ProductsFilters />
					<Dialog>
						<DialogTrigger asChild>
							<Button>
								<PlusCircle className="size-4 mr-2" />
								Novo produto
							</Button>
						</DialogTrigger>
						<CreateProductDialog />
					</Dialog>
				</div>
				<div className="border rounded-lg p-2">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>Produto</TableHead>
								<TableHead>Preço</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="text-left">
							{products?.map((product) => {
								return (
									<TableRow key={product.id}>
										<TableCell>{product.id}</TableCell>
										<TableCell>{product.name}</TableCell>
										<TableCell>{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</div>
			<Toaster/>
		</ThemeProvider>
	);
}
