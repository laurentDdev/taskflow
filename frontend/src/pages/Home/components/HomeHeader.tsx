import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import CreateWorkspace from "./CreateWorkspace";
import { Button } from "@/components/ui/button";

interface HomeHeaderProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ filter, setFilter }) => {
  const { t } = useTranslation("home");

  const form = useForm({
    defaultValues: {
      filter,
    },
  });

  return (
    <header className="grid grid-cols-12 gap-4 items-center justify-between">
      <h1 className="col-span-2 text-center text-xl">{t("myWorkspaces")}</h1>
      <form className="col-span-7">
        <Controller
          name="filter"
          control={form.control}
          render={({ field }) => (
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder={t("search")}
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              />
              <InputGroupAddon align={"inline-end"}>
                <FaSearch />
              </InputGroupAddon>
            </InputGroup>
          )}
        />
      </form>
      <CreateWorkspace>
        <Button className="col-span-3 flex justify-center hover:scale-[101%] transition-transform duration-500">
          <FaPlus />
          {t("newWorkspaces")}
        </Button>
      </CreateWorkspace>
    </header>
  );
};

export default HomeHeader;
