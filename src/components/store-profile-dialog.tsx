import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getManagedRestaurant, type GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  const { register, handleSubmit, formState: { isSubmitting }} = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  })

  function updateManagedRestaurantCache({
    name,
    description
  }: StoreProfileSchema){
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

      if (cached) {
          queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
            ...cached,
            name,
            description,
          })
        }

      return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({name, description}) {
        const {cached} = updateManagedRestaurantCache({name, description })
          
        return {previousProfile: cached}
    },
    onError(_, __, context) {
        if (context?.previousProfile) {
          updateManagedRestaurantCache(context.previousProfile)
        }
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description
      })
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar perfil. Tente novamente mais tarde.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>Atualize as informações do seu estabelecimento visíveis ao seu cliente.</DialogDescription>
      </DialogHeader>

     <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="name">
            Nome
          </Label>
          <Input className="col-span-3" id="name" {...register('name')}/>
        </div>

         <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="description">
            Descrição
          </Label>
          <Textarea className="col-span-3" id="description" {...register('description')}/>
        </div>
      </div>

       <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">Cancelar</Button>
        </DialogClose>
        <Button 
          type="submit" 
          variant="success" 
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </DialogFooter>
     </form>
    </DialogContent>
  )
}