import { Config, modifyConfig } from "./config";

interface OverlayProps {
  config: Config;
  setConfig(config: Config): void;
}

interface SectionProps {
  title: string;
  configKey: keyof Config;
  options: Record<string, string>;
}

export const PublicOverlay = (props: OverlayProps) => {
  const { config, setConfig } = props;

  const Section = (props: SectionProps) => {
    const { title, configKey, options } = props;
    return <div className={"section"}>
      <span className="setting-title">{title}</span>
      <div className={"row"}>
        {Object.entries(options).map(([preset, label]) => {
          const active = label == config[configKey];
          const className = `${preset} ${active ? "active" : ""}`;
          const update = { [configKey]: label };
          return <button key={preset} className={className}
            onClick={() => setConfig(modifyConfig(config, update))}>
            {label}
          </button>;
        })}
      </div>
    </div>;
  };

  return <div className={"overlay"}>
    <Section
      title={"FarmBot"}
      configKey={"sizePreset"}
      options={{
        "genesis": "Genesis",
        "genesis-xl": "Genesis XL",
      }} />
    <Section
      title={"Season"}
      configKey={"plants"}
      options={{
        "winter": "Winter",
        "spring": "Spring",
        "summer": "Summer",
        "fall": "Fall",
      }} />
    <Section
      title={"Bed Type"}
      configKey={"bedType"}
      options={{
        "standard": "Standard",
        "mobile": "Mobile",
      }} />
  </div>;
};

interface ConfigRowProps {
  configKey: keyof Config;
  children: React.ReactNode;
}

const ConfigRow = (props: ConfigRowProps) => {
  const { configKey } = props;
  return <div className={"config-row"}>
    <span className={"config-key"}>{configKey}</span>
    {props.children}
  </div>;
};

interface SliderProps extends OverlayProps {
  configKey: keyof Config;
  min: number;
  max: number;
}

const Slider = (props: SliderProps) => {
  const { config, setConfig, configKey, min, max } = props;
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value);
    if (isNaN(newValue)) { return; }
    const update = { [configKey]: newValue };
    setConfig(modifyConfig(config, update));
  };
  const value = config[configKey] as number;
  return <ConfigRow configKey={configKey}>
    <input type={"number"} value={value} onChange={change} />
    <input
      type={"range"}
      min={min}
      max={max}
      value={value}
      onChange={change}
    />
  </ConfigRow>;
};

interface ToggleProps extends OverlayProps {
  configKey: keyof Config;
}

const Toggle = (props: ToggleProps) => {
  const { config, setConfig, configKey } = props;
  return <ConfigRow configKey={configKey}>
    <input
      type={"checkbox"}
      checked={!!config[configKey]}
      onChange={e => {
        const newValue = e.currentTarget.checked;
        const update = { [configKey]: newValue };
        setConfig(modifyConfig(config, update));
      }}
    />
  </ConfigRow>;
};

interface RadioProps extends OverlayProps {
  configKey: keyof Config;
  options: string[];
}

const Radio = (props: RadioProps) => {
  const { config, setConfig, configKey, options } = props;
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    const update = { [configKey]: newValue };
    setConfig(modifyConfig(config, update));
  };
  return <ConfigRow configKey={configKey}>
    <div className={"options"}>
      {options.map(value =>
        <div key={value}>
          <input key={value}
            type={"radio"}
            name={configKey}
            value={value}
            checked={config[configKey] == value}
            onChange={change}
          />
          <label>{value}</label>
        </div>)}
    </div>
  </ConfigRow>;
};

export const PrivateOverlay = (props: OverlayProps) => {
  const bedMin = props.config.bedWallThickness * 2;
  return <div className={"all-configs"}>
    <details>
      <summary>{"Configs"}</summary>
      <div className={"spacer"} />
      <label>{"Presets"}</label>
      <Radio {...props} configKey={"sizePreset"}
        options={["Jr", "Genesis", "Genesis XL"]} />
      <Radio {...props} configKey={"bedType"}
        options={["Standard", "Mobile"]} />
      <Radio {...props} configKey={"otherPreset"}
        options={["Initial", "Minimal", "Maximal", "Reset all"]} />
      <label>{"Bot Position"}</label>
      <Slider {...props} configKey={"x"} min={0} max={props.config.botSizeX} />
      <Slider {...props} configKey={"y"} min={0} max={props.config.botSizeY} />
      <Slider {...props} configKey={"z"} min={0} max={props.config.botSizeZ} />
      <label>{"Bot Dimensions"}</label>
      <Slider {...props} configKey={"botSizeX"} min={0} max={6000} />
      <Slider {...props} configKey={"botSizeY"} min={0} max={4000} />
      <Slider {...props} configKey={"botSizeZ"} min={0} max={1000} />
      <Slider {...props} configKey={"beamLength"} min={0} max={4000} />
      <Slider {...props} configKey={"columnLength"} min={0} max={1000} />
      <Slider {...props} configKey={"zAxisLength"} min={0} max={2000} />
      <Slider {...props} configKey={"bedXOffset"} min={-500} max={500} />
      <Slider {...props} configKey={"bedYOffset"} min={-1500} max={1500} />
      <Slider {...props} configKey={"beamLength"} min={0} max={1000} />
      <Slider {...props} configKey={"zGantryOffset"} min={0} max={500} />
      <Toggle {...props} configKey={"tracks"} />
      <label>{"Bed Properties"}</label>
      <Slider {...props} configKey={"bedWallThickness"} min={0} max={200} />
      <Slider {...props} configKey={"bedHeight"} min={0} max={1000} />
      <Slider {...props} configKey={"ccSupportSize"} min={0} max={200} />
      <Slider {...props} configKey={"bedWidthOuter"} min={bedMin} max={3100} />
      <Slider {...props} configKey={"bedLengthOuter"} min={bedMin} max={6100} />
      <Slider {...props} configKey={"bedZOffset"} min={0} max={1000} />
      <Slider {...props} configKey={"legSize"} min={0} max={200} />
      <Toggle {...props} configKey={"legsFlush"} />
      <Slider {...props} configKey={"extraLegsX"} min={0} max={10} />
      <Slider {...props} configKey={"extraLegsY"} min={0} max={10} />
      <Slider {...props} configKey={"bedBrightness"} min={1} max={12} />
      <Slider {...props} configKey={"soilBrightness"} min={1} max={12} />
      <Slider {...props} configKey={"soilHeight"} min={0} max={1000} />
      <label>{"Other"}</label>
      <Radio {...props} configKey={"plants"}
        options={["Winter", "Spring", "Summer", "Fall", "Random", "None"]} />
      <Toggle {...props} configKey={"labels"} />
      <Toggle {...props} configKey={"trail"} />
      <Toggle {...props} configKey={"perspective"} />
      <Toggle {...props} configKey={"bot"} />
      <Toggle {...props} configKey={"laser"} />
      <Radio {...props} configKey={"tool"} options={["rotaryTool", "None"]} />
      <Toggle {...props} configKey={"cableCarriers"} />
      <Toggle {...props} configKey={"stats"} />
      <Toggle {...props} configKey={"viewCube"} />
      <Toggle {...props} configKey={"config"} />
      <label>{"Environment"}</label>
      <Toggle {...props} configKey={"ground"} />
      <Toggle {...props} configKey={"axes"} />
      <Toggle {...props} configKey={"grid"} />
      <Toggle {...props} configKey={"clouds"} />
      <Slider {...props} configKey={"sunInclination"} min={0} max={180} />
      <Slider {...props} configKey={"sunAzimuth"} min={0} max={360} />
    </details>
  </div>;
};

