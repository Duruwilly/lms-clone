import classNames from "classnames";
import { type HTMLAttributes } from "react";
import Input from "~/components/ui/Input/text-input";
import SearchIcon from "~/assets/svg/icons/search-icon";
import BellIcon from "~/assets/svg/icons/bell-icon";
import DummyAvi from "~/assets/images/dummy-avi.png";
import Localization from "~/components/general/localization";
import Breadcrumb from "~/components/general/breadcrumb";
import { useAppStore } from "~/store/app-store";

interface NavProps extends HTMLAttributes<HTMLDivElement> {}

const Navbar = ({ className }: NavProps) => {
  const { searchField, setSearchField } = useAppStore();

  return (
    <div
      className={classNames(
        `bg-(--color-primary) py-5 px-6 flex gap-7 items-center sticky top-0 right0 z-10 w-full justify-between`,
        className,
      )}
    >
      <Breadcrumb includeRootPrefix={false} />

      <div className="flex items-center gap-10">
        <div className="w-[346px]">
          <Input
            className="!border-(--color-border-secondary)"
            name="search"
            placeholder="Search..."
            preIcon={<SearchIcon className="text-(--color-icon-secondary)" />}
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="bg(--colorprimary) border(--color-bordersecondary) roundedlg size10 flex itemscenter justifycenter relative">
            <BellIcon width={24} height={24} />
            <div className="size-2 rounded-full bg-(--color-error-text) absolute top-0 right-0" />
          </div>

          <Localization />

          <img
            src={DummyAvi}
            alt="profile picture"
            className="size-12 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
