import { FormEditarCadastro } from "@/components/partials/produto/form-editar-cadastro";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ProductType = {
  codigo: string;
  nome: string;
  descricao: string;
  quantidade_estoque: number;
};

export function ModalEditarProduto({ product }: { product: ProductType }) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogDescription>
          Edite o cadastro do produto preenchendo os campos abaixo.
        </DialogDescription>
      </DialogHeader>

      <FormEditarCadastro product={product} />
    </DialogContent>
  );
}