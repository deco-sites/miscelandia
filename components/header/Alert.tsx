import Icon from "../ui/Icon.tsx";

export type Link = {
  label: string;
  href: string;
};
export interface Props {
  whatsapp: Link;
  email: Link;
  infos: Link[];
}

function Alert({ props }: { props: Props }) {
  const { whatsapp, email, infos } = props;
  return (
    <div class="w-full h-8 flex flex-row justify-between bg-pre-header items-center px-10">
      <div class="flex gap-4 justify-center items-center">
        <a
          class="text-links-pre-header text-xs font-firaSans font-light flex items-center gap-2 hover:text-default"
          href={whatsapp?.href}
        >
          <Icon
            id="WhatsApp"
            size={12}
          />
          {whatsapp?.label}
        </a>
        <a
          class="text-links-pre-header text-xs font-firaSans font-light flex items-center gap-2 hover:text-default"
          href={email?.href}
        >
          <Icon
            id="Email"
            size={12}
          />
          {email?.label}
        </a>
      </div>
      <div class="flex gap-2 justify-center items-center ">
        {infos?.map((info) => (
          <a
            class="text-links-pre-header text-xs font-firaSans font-light px-5  border-links-pre-header border-r last:border-r-0 hover:text-default"
            href={info.href}
          >
            {info.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Alert;
