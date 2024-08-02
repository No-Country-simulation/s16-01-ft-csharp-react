import { useState } from "react";
import { useItemsActions } from "../hooks/useItemsActions";
import { Card, CardBody, CardFooter, Chip, Input, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";
import GlassButton from "../assets/GlassButton";
import CheckBadge from "../assets/CheckBadge";
import { Link } from "react-router-dom";
import { PreferenceModal } from "../components/container/PreferenceModal";
import { useUsersActions } from "../hooks/useUsersActions";
import { Item } from "../models/types";

export const data = [
  { value: "platos", },
  { value: "entradas", },
  { value: "bebibles" },
  { value: "postres", },
];

export default function MenuPage() {
  const { items  } = useItemsActions()
  const { myUser, useSetUserPreferences } = useUsersActions()
  const [filter, setFilter] = useState<string>("");
  const [category, setCategory] = useState<string>("platos");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const getFilteredItems = () => {
    return items
      .filter((item: Item) =>
        (item.category === category) &&
        (item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.description.toLowerCase().includes(filter.toLowerCase()) ||
          item.keywords.some((keyword: String) => keyword.toLowerCase().includes(filter.toLowerCase()))) &&
        (!myUser.preferences.some((preference: string) =>
          item.ingredients.some(ingredient => ingredient.toLowerCase().includes(preference.toLowerCase()))))
      )
    };

  const deletePreference = (preference: string) => {
    useSetUserPreferences({...myUser, preferences: myUser.preferences.filter((value: string) => value !== preference)})
  }

  return (
    <div className="min-h-full min-w-full flex flex-col items-center pt-[4.37rem] pb-[6.5rem]">
      <div className="flex min-w-[90%] items-center place-content-center pt-5 gap-3">
        <div className="relative flex w-full max-w-[91.1%]">
          <Input crossOrigin="false" name="search" type="text" label="Buscar" placeholder="Buscar" value={filter} onChange={handleChange} className="pr-20" containerProps={{ className: "min-w-0" }} />
          <GlassButton />
        </div>
        <PreferenceModal />
      </div>
      <div className="min-w-[90%] max-w-[90%] flex pt-4 gap-2 pb-6 overflow-x-scroll">
        {myUser.preferences.map((preference: string, index: number) => (
          <Chip key={index} 
            onClose={() => deletePreference(preference)}
            value={preference} 
            size="sm"
            className="text-[0.875rem] capitalize bg-[#949A9D] text-white"
          />
        ))}
      </div>
      <Tabs value={category} >
        <TabsHeader className="max-h-[4rem] max-w-full px-[5%] overflow-x-scroll flex" >
          {data.map(({ value }, index) => (
            <Tab key={index} value={value} className="h-[2.5rem] min-w-fit px-2 mr-2 capitalize" onClick={() => setCategory(value)} >
              {value}
            </Tab>
          ))}
          </TabsHeader>
        </Tabs>
        
      <div className="flex flex-col max-w-[90%] items-center place-content-center">
        <Typography variant="h6" className="mt-5 self-start capitalize" >{ category } </Typography>
        <div className="max-w-full flex flex-col gap-5">
          {getFilteredItems().map((item, index) => (
            <Card key={index} className="">
              <Link to={`/product/`.concat(item.item_id)} >
              <CardBody className="">
                <div className="pb-3 flex justify-between">
                  <div className="">
                    <Typography variant="h5" className="text-black font-normal">{item.name}</Typography>
                    <Typography variant="small" className="font-medium text-blue-gray-500">Para {item.portion} persona(s)</Typography>
                  </div>
                  <Typography variant="h5" className="text-black min-w-fit">{'$ ' + item.price.toFixed(2)}</Typography>
                </div>
                <Typography variant="paragraph" className="text-[#607D8B]">{item.description}</Typography>
              </CardBody>
              <CardFooter className="flex gap-4 pt-0">
                {item.keywords.map((keyword, index) => (
                  <div key={index} className="flex items-center gap-[0.2rem]">
                    <CheckBadge/><Typography variant="small" className="capitalize">{keyword}</Typography>
                  </div>
                ))}
              </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
