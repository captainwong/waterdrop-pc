import { useUserInfoContext } from '@/hooks/userHooks';
import { useOrganizations } from '@/services/organization';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { getCurrentOrganization, setCurrentOrganization } from '@/utils/curorg';
import _ from 'lodash';
import { Select } from 'antd';

export const OrganizationSelect = () => {
  const { data: orgs, refetch } = useOrganizations(1, DEFAULT_PAGE_SIZE, true);
  // const { go } = useGoTo();
  const { setStore } = useUserInfoContext();

  // useEffect(() => {
  //   const curOrgId = getCurrentOrganization()?.id;
  //   if (curOrgId) {
  //     setStore({ selectedOrganizationId: curOrgId });
  //   } else {
  //     // go(ROUTE_KEYS.NO_ORG);
  //   }
  // });

  const onSearch = _.debounce((name: string) => {
    refetch({ name });
  }, 500);

  const onChange = (val: { value: string, label: string }) => {
    setStore({ selectedOrganizationId: val.value });
    setCurrentOrganization({ id: val.value, name: val.label });
  };

  const curOrg = getCurrentOrganization();

  return (
    <div>
      选择门店：
      <Select
        style={{ width: 200 }}
        placeholder="请选择门店"
        showSearch
        onSearch={onSearch}
        filterOption={false}
        defaultValue={
          curOrg &&
          {
            value: curOrg.id,
            label: curOrg.name,
          }
        }
        onChange={onChange}
        labelInValue
      >
        {orgs?.map((org) => (
          <Select.Option key={org.id} value={org.id}>
            {org.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
