
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import TabProductsGeneral from "./TabProductsGeneral"
import TabsProductsByBranch from "./TabsProductsByBranch"

export function TabsProducts() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-sm">
        <TabsTrigger className="" value="general">General</TabsTrigger>
        <TabsTrigger className="" value="location">Por sucursal</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <TabProductsGeneral />
      </TabsContent>
      <TabsContent value="location">
        <TabsProductsByBranch />
      </TabsContent>
    </Tabs>
  )
}
