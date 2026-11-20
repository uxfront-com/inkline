import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * Every colour in every variant, one row per variant.
 *
 * @category Components/Actions/Button
 */
export default function ButtonColors() {
  return (
    <div>
      <div>
        <IButton variant="solid" color="primary" label="Primary" />
        <IButton variant="solid" color="secondary" label="Secondary" />
        <IButton variant="solid" color="success" label="Success" />
        <IButton variant="solid" color="info" label="Info" />
        <IButton variant="solid" color="warning" label="Warning" />
        <IButton variant="solid" color="error" label="Error" />
        <IButton variant="solid" color="light" label="Light" />
        <IButton variant="solid" color="dark" label="Dark" />
        <IButton variant="solid" color="neutral" label="Neutral" />
      </div>
      <div>
        <IButton variant="outline" color="primary" label="Primary" />
        <IButton variant="outline" color="secondary" label="Secondary" />
        <IButton variant="outline" color="success" label="Success" />
        <IButton variant="outline" color="info" label="Info" />
        <IButton variant="outline" color="warning" label="Warning" />
        <IButton variant="outline" color="error" label="Error" />
        <IButton variant="outline" color="light" label="Light" />
        <IButton variant="outline" color="dark" label="Dark" />
        <IButton variant="outline" color="neutral" label="Neutral" />
      </div>
      <div>
        <IButton variant="soft" color="primary" label="Primary" />
        <IButton variant="soft" color="secondary" label="Secondary" />
        <IButton variant="soft" color="success" label="Success" />
        <IButton variant="soft" color="info" label="Info" />
        <IButton variant="soft" color="warning" label="Warning" />
        <IButton variant="soft" color="error" label="Error" />
        <IButton variant="soft" color="light" label="Light" />
        <IButton variant="soft" color="dark" label="Dark" />
        <IButton variant="soft" color="neutral" label="Neutral" />
      </div>
      <div>
        <IButton variant="subtle" color="primary" label="Primary" />
        <IButton variant="subtle" color="secondary" label="Secondary" />
        <IButton variant="subtle" color="success" label="Success" />
        <IButton variant="subtle" color="info" label="Info" />
        <IButton variant="subtle" color="warning" label="Warning" />
        <IButton variant="subtle" color="error" label="Error" />
        <IButton variant="subtle" color="light" label="Light" />
        <IButton variant="subtle" color="dark" label="Dark" />
        <IButton variant="subtle" color="neutral" label="Neutral" />
      </div>
      <div>
        <IButton variant="ghost" color="primary" label="Primary" />
        <IButton variant="ghost" color="secondary" label="Secondary" />
        <IButton variant="ghost" color="success" label="Success" />
        <IButton variant="ghost" color="info" label="Info" />
        <IButton variant="ghost" color="warning" label="Warning" />
        <IButton variant="ghost" color="error" label="Error" />
        <IButton variant="ghost" color="light" label="Light" />
        <IButton variant="ghost" color="dark" label="Dark" />
        <IButton variant="ghost" color="neutral" label="Neutral" />
      </div>
      <div>
        <IButton variant="link" color="primary" label="Primary" />
        <IButton variant="link" color="secondary" label="Secondary" />
        <IButton variant="link" color="success" label="Success" />
        <IButton variant="link" color="info" label="Info" />
        <IButton variant="link" color="warning" label="Warning" />
        <IButton variant="link" color="error" label="Error" />
        <IButton variant="link" color="light" label="Light" />
        <IButton variant="link" color="dark" label="Dark" />
        <IButton variant="link" color="neutral" label="Neutral" />
      </div>
    </div>
  );
}
