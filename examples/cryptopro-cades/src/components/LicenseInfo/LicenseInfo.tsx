import { ILicense } from '@astral/cryptopro-cades';

type LicenseInfoProps = {
  license: ILicense | null;
  type: string;
};

export const LicenseInfo = ({ license, type }: LicenseInfoProps) => (
  <>
    <div className="d-flex column-gap-2">
      <div className="badge text-bg-info d-flex align-items-center">
        {type?.toUpperCase()}
      </div>
      <span style={{ display: 'block' }}>
        <b>Серийный номер:</b> {license?.serialNumber}
      </span>
    </div>
    <span style={{ display: 'block' }}>
      <b>Валидная:</b> {license?.isValid ? 'Да' : 'Нет'}
    </span>
    <span style={{ display: 'block' }}>
      <b>Срок действия:</b> {license?.validTo}
    </span>
  </>
);
