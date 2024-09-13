import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import addressStore from '../stores/AddressStore';
import { MetersType } from '../types';
import { HVSIcon } from './HVSIcon';
import { GVSIcon } from './GVSIcon';
import { DeleteBtn } from './DeleteBtn';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

interface IAddressData {
  str_number_full?: string;
  house?: {
    address?: string;
  };
}

interface IProps {
  meter: MetersType;
  index: number;
}

export const MeterRow = observer((props: IProps) => {
  const [addressData, setAddressData] = useState<IAddressData>({});
  const { meter, index } = props;
  const areaId = meter?.area?.id;
  const {
    id,
    _type,
    installation_date,
    is_automatic,
    initial_values,
    description,
  } = meter || {};

  useEffect(() => {
    const fetchAddress = async () => {
      const fetchAddress = await addressStore.fetchAddressById(areaId);
      setAddressData(fetchAddress);
    };

    fetchAddress();
  }, [areaId]);

  if (addressStore.isLoading) {
    return <div>Идет загрузка адреса...</div>;
  }

  if (addressStore.error) {
    return <div>Ошибка при загрузке адреса: {addressStore.error}</div>;
  }

  const typeIcon = (type: string) => {
    if (type === 'ColdWaterAreaMeter') {
      return <HVSIcon />;
    } else {
      return <GVSIcon />;
    }
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{typeIcon(_type[0])}</td>
      <td>{formatDate(installation_date)}</td>
      <td>{is_automatic ? 'Да' : 'Нет'}</td>
      <td>{initial_values[0]}</td>
      <td>
        {addressData?.house?.address || addressData?.str_number_full ? (
          `${addressData?.house?.address || ''} ${
            addressData?.str_number_full || ''
          }`
        ) : (
          <p>Адрес не найден</p>
        )}
      </td>
      <td>
        {description}
        <DeleteBtn id={id} />
      </td>
    </tr>
  );
});
