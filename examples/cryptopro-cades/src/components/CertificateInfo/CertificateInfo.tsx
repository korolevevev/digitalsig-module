import { Certificate } from '@astral/cryptopro-cades';
import { IconDownload } from '../../ui/icons/IconDownload';
import React from 'react';

type CertificateInfoProps = {
  certificate: Certificate;
  onSelect?: Function;
  showAttributes?: boolean;
  titleLeft?: JSX.Element;
  checkEncryptDecrypt?: (_: any) => Promise<void>;
};

export const CertificateInfo = ({
  certificate,
  onSelect,
  showAttributes = false,
  titleLeft,
  checkEncryptDecrypt,
}: CertificateInfoProps) =>
  certificate ? (
    <div
      className="card bg-light"
      onClick={(e) => onSelect && onSelect(certificate.subjectKeyId)}
    >
      <div className="card-body d-flex flex-column row-gap-2">
        <div className="card-title d-flex column-gap-2">
          {!!titleLeft && titleLeft}
          <div className="text-primary">{certificate.subject.commonName}</div>
          <a
            href={`data:application/x-x509-ca-cert;base64,${certificate.certificateBase64Data}`}
            download={`${certificate.subject.commonName}.cer`}
          >
            <IconDownload />
          </a>
        </div>
        <div className="card-subtitle">
          subjectKeyId:{' '}
          <span
            onClick={(e) =>
              navigator.clipboard.writeText(certificate.subjectKeyId!)
            }
            style={{ color: 'gray' }}
          >
            {certificate.subjectKeyId}
          </span>
        </div>
        {!!showAttributes && (
          <div className="accordion">
            <div className="accordion-item">
              <div className="accordion-header">
                <button
                  className="accordion-button bg-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCertAttributes"
                  aria-expanded="true"
                  aria-controls="collapseCertAttributes"
                >
                  Атрибуты сертификата
                </button>
              </div>
              <div
                id="collapseCertAttributes"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionEnvironment"
              >
                <div className="accordion-body flex-row">
                  {Object.keys(certificate)
                    .filter(
                      (key) =>
                        ![
                          'certificateBase64Data',
                          'certificateBin',
                          'subjectKeyId',
                        ].includes(key),
                    )
                    .map((key, index) => (
                      <span style={{ display: 'block' }} key={index}>
                        <b>{key}:</b>{' '}
                        {certificate[key] instanceof Object
                          ? JSON.stringify(certificate[key])
                          : (certificate[key]?.toString() ?? 'null')}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {!!checkEncryptDecrypt && (
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={checkEncryptDecrypt}
          >
            Проверить шифрование/расшифровку
          </button>
        )}
      </div>
    </div>
  ) : null;
