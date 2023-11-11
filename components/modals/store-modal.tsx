"use client";
import * as z from "zod";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DESTRUCTION } from "dns";

const formSchema = z.object({
    name:z.string().min(1),
});

export const StoreModal= () => {
    const storeModal = useStoreModal();
    const form =useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
        }
    })
    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
    <Modal
    title="Create store"
    description = " Add a new store to manage products and categories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-Commerce" {...field}/>
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justifty-end">
                            <Button variant="destructive" onClick={storeModal.onClose}>Cancel</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
}