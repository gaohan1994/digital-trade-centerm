import { api } from './service';

export const AcqCode = '283499';
export const MerchantId = '105000248164385';

export const ResponseCode = {
  success: 'SUCCESS',
  sub_success_code: '0000',
};

export const EncryptKeys = {
  PublicKey:
    '30819F300D06092A864886F70D010101050003818D0030818902818100A5C340C8A183CEFFB3EE1D2B8860CC775DA25436A8904994F33761D947842EB632504D532AFDD34785CFC312136D998CAE97BF123FF96025D260C1DCD4D584AEED597411B49348FDF55FD7C4C0E9DE278BD44502A4E631CADAE1FAA27733F43723D4A4A3175E9AF855675F8C912A179A214EE4958BFF0E3A7EE9480AEB4CDD5B0203010001',
  PrivateKey:
    '30820276020100300D06092A864886F70D0101010500048202603082025C0201000281810092BC6F4DF316164B5D0053DD4D325AEFCB4A6E3729E1830589A66F076035DD54AF11704FB1DE7907C3923F85CEE6E5455C9C35D6D0A59C26A28003E524CF2F04C4A7D41B4BB04191F32E9D7B3C5CC10F2F4499B4DD8732C8C46507CC848C8A604902B457F67D9CF8AA5DBECD7D82DDF2A0DD74573B700FC2134F20CD655B2ECF02030100010281801256E8D6663E6974EBDFC19B942D69FE347B4E012903DD7B50B3F3868978D1FBE6919866ED852FBD4FAD34B145A5C81BFE322BEC78516A8DCD9B90611053B0BD88417B250CFC819CF7C615D5555E8EBA2461482C562F8C811CFA28964327037DFBDE68DED8266D0C1503FC22CB4BA126368A0C2EC345ADB78E0492268E4BCAA1024100CFE5E03985DDF30403220F41CA80E55E19A76E775C3E0A923572750F27DDDC50720ED5FBEA165313693EC05D81E015A9E19F70ED09C583CE97848E63AAE0D71F024100B4AFD81CA69CE016B13A2ACAFCC9125531E2A8FC7C61EB775D1ED79C25BAC14875D5AF808D61282022757FEDCC1DE893040E14243BD7556FE9CD01242CBB22510241008620BF1B1D9CE66E8E3EE92CFF234DD7FA212589E87F367EC1F0C84930E55880A635A024D90FF22531DF84684FA46D159F3528BC2573C2E804A546E0529CA0ED024065AF383E177DDD96A7B28676AA003672FF9A0163E653ED01C5C41FAEDE84D555840AF7B3AEDCE889FD1A871E3A6AF2821A1C1A35B1FFA333522E6EDFFED469A102400D5EAF10587731F90BD56416826195F3153B8CDC9FC0F1D10B2819F7727B113203B6E95F8CB92C858A4A15E94F8E74B1571EC57CB9855420821D858954D2B7F1',
};

/**
 * 客户基本信息查询
 *
 * @param {*} params
 */
export const fetchUserInfo = (params) =>
  api.post('/trade/userInfoQuery', params);

/**
 * 被扫接口（B 扫 C）
 *
 * @param {*} params
 */
export const fetchTradePay = (params) => api.post('/trade/pay', params);

/**
 * 主扫接口（C 扫 B）
 *
 * @param {*} params
 */
export const fetchTradeUnified = (params) => api.post('/trade/unified', params);

/**
 * 欠费信息查询
 *
 * @param {*} params
 */
export const fetchOwInfoQuery = (params) =>
  api.post('/trade/owInfoQuery', params);

/**
 * 充值缴费通知
 *
 * @param {*} params
 */
export const fetchRechargePayNotice = (params) =>
  api.post('/trade/rechargePayNotice', params);

/**
 * 欠费缴费通知
 *
 * @param {*} params
 */
export const fetchOwPayNotice = (params) =>
  api.post('/trade/owPayNotice', params);

/**
 * 支付查询接口
 *
 * @param {*} params
 */
export const fetchQuery = (params) => api.post('/trade/query', params);
