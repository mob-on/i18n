interface FlagProperties {
  id: string;
  size?: string;
  props?: any;
}

export const Flag = ({ id, size = "2em", ...props }: FlagProperties) => {
  return (
    <span
      className={`fi fi-${id.toLowerCase()} fis rounded-circle`}
      style={{ height: size, width: size }}
      {...props}
    ></span>
  );
};

export default Flag;
