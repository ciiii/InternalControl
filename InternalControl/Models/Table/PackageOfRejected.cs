using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfRejected[废标的包;   废标时,复制包的所有数据到这里,编号就是是原包id;同时原来的包生成新的执行项目,且原包的执行项目id指向了新的执行项目id;凡是要查看废标包的,其实所有执行项目需要展示包信息的,都需要从这里取废包数据查看,红色不能修改;注意:一个执行项目中只要不是所有的包都废了,那还是继续走.如果全都废了,那就标记为-2;这个中的必要性认证包附件 执行包附件这两个字段的名称和原字段名不一样;类]
    /// </summary>
    [Serializable]
	public partial class PackageOfRejected 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 申报项目Id
		/// </summary>
        [DisplayName("申报项目Id")]
        [Required(ErrorMessage ="请提供[DeclareProjectId]")]
		public int DeclareProjectId { get; set; }
        /// <summary>
		/// 预算项目Id
		/// </summary>
        [DisplayName("预算项目Id")]
		public int? BudgetProjectId { get; set; }
        /// <summary>
		/// 执行项目Id
		/// </summary>
        [DisplayName("执行项目Id")]
        [Required(ErrorMessage ="请提供[ExecuteProjectId]")]
		public int ExecuteProjectId { get; set; }
        /// <summary>
		/// 品目编号
		/// </summary>
        [DisplayName("品目编号")]
        [Required(ErrorMessage ="请提供[ItemId]")]
		public int ItemId { get; set; }
        /// <summary>
		/// 是否进口设备
		/// </summary>
        [DisplayName("是否进口设备")]
        [Required(ErrorMessage ="请提供[IsImported]")]
		public bool IsImported { get; set; }
        /// <summary>
		/// 申报技术要求
		/// </summary>
        [DisplayName("申报技术要求")]
		public string DeclareTechnicalRequirements { get; set; }
        /// <summary>
		/// 申报数量,默认1
		/// </summary>
        [DisplayName("申报数量,默认1")]
        [Required(ErrorMessage ="请提供[DeclareNumber]")]
		public int DeclareNumber { get; set; }
        /// <summary>
		/// 申报单价,必填
		/// </summary>
        [DisplayName("申报单价,必填")]
        [Required(ErrorMessage ="请提供[DeclareUnitPrice]")]
		public int DeclareUnitPrice { get; set; }
        /// <summary>
		/// 单位,默认件
		/// </summary>
        [DisplayName("单位,默认件")]
        [Required(ErrorMessage ="请提供[Unit]")]
        [MaxLength(10,ErrorMessage ="Unit不能超过[5]字")]
		public string Unit { get; set; }
        /// <summary>
		/// 申报附件
		/// </summary>
        [DisplayName("申报附件")]
        [MaxLength(100,ErrorMessage ="Attachment不能超过[50]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// 论证技术要求
		/// </summary>
        [DisplayName("论证技术要求")]
		public string BudgetTechnicalRequirements { get; set; }
        /// <summary>
		/// 论证数量
		/// </summary>
        [DisplayName("论证数量")]
		public int? BudgetNumber { get; set; }
        /// <summary>
		/// 论证单价
		/// </summary>
        [DisplayName("论证单价")]
		public int? BudgetUnitPrice { get; set; }
        /// <summary>
		/// 预算附件
		/// </summary>
        [DisplayName("预算附件")]
        [MaxLength(100,ErrorMessage ="BudgetAttachment不能超过[50]字")]
		public string BudgetAttachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int? SerialNumber { get; set; }
        /// <summary>
		/// 执行技术要求
		/// </summary>
        [DisplayName("执行技术要求")]
		public string ExecuteTechnicalRequirements { get; set; }
        /// <summary>
		/// 执行数量
		/// </summary>
        [DisplayName("执行数量")]
		public int? ExecuteNumber { get; set; }
        /// <summary>
		/// 执行单价
		/// </summary>
        [DisplayName("执行单价")]
		public int? ExecuteUnitPrice { get; set; }
        /// <summary>
		/// 执行附件
		/// </summary>
        [DisplayName("执行附件")]
        [MaxLength(100,ErrorMessage ="ExecuteAttachment不能超过[50]字")]
		public string ExecuteAttachment { get; set; }
        /// <summary>
		/// 是否面向中小企业
		/// </summary>
        [DisplayName("是否面向中小企业")]
		public bool? IsMSE { get; set; }
        /// <summary>
		/// 招标方式
		/// </summary>
        [DisplayName("招标方式")]
        [MaxLength(50,ErrorMessage ="BiddingMethod不能超过[25]字")]
		public string BiddingMethod { get; set; }
        /// <summary>
		/// 是否接受联合体
		/// </summary>
        [DisplayName("是否接受联合体")]
		public bool? IsAcceptCombo { get; set; }
        /// <summary>
		/// 是否收取投标保证金
		/// </summary>
        [DisplayName("是否收取投标保证金")]
		public bool? IsTakeBidBond { get; set; }
        /// <summary>
		/// 投标保证金
		/// </summary>
        [DisplayName("投标保证金")]
		public int? BidBond { get; set; }
        /// <summary>
		/// 是否收取履约保证金
		/// </summary>
        [DisplayName("是否收取履约保证金")]
		public bool? IsTakePerformanceBond { get; set; }
        /// <summary>
		/// 履约保证金
		/// </summary>
        [DisplayName("履约保证金")]
		public int? PerformanceBond { get; set; }
        /// <summary>
		/// 项目联系人姓名
		/// </summary>
        [DisplayName("项目联系人姓名")]
        [MaxLength(50,ErrorMessage ="LinkmanName不能超过[25]字")]
		public string LinkmanName { get; set; }
        /// <summary>
		/// 联系电话
		/// </summary>
        [DisplayName("联系电话")]
        [MaxLength(50,ErrorMessage ="LinkmanPhone不能超过[25]字")]
		public string LinkmanPhone { get; set; }
        /// <summary>
		/// 服务期限
		/// </summary>
        [DisplayName("服务期限")]
        [MaxLength(1000,ErrorMessage ="TermOfService不能超过[500]字")]
		public string TermOfService { get; set; }
        /// <summary>
		/// 资格条件
		/// </summary>
        [DisplayName("资格条件")]
        [MaxLength(1000,ErrorMessage ="Prerequisites不能超过[500]字")]
		public string Prerequisites { get; set; }
        /// <summary>
		/// 付款方式
		/// </summary>
        [DisplayName("付款方式")]
        [MaxLength(1000,ErrorMessage ="PaymentMethod不能超过[500]字")]
		public string PaymentMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(200,ErrorMessage ="TechnicalRequirementsAttachment不能超过[100]字")]
		public string TechnicalRequirementsAttachment { get; set; }
        /// <summary>
		/// 项目概况
		/// </summary>
        [DisplayName("项目概况")]
		public string TechnicalRequirements { get; set; }
        /// <summary>
		/// 评分标准
		/// </summary>
        [DisplayName("评分标准")]
        [MaxLength(200,ErrorMessage ="GradingStandard不能超过[100]字")]
		public string GradingStandard { get; set; }
        /// <summary>
		/// 抽取供应商名单
		/// </summary>
        [DisplayName("抽取供应商名单")]
        [MaxLength(1000,ErrorMessage ="ExtractSupplierLlist不能超过[500]字")]
		public string ExtractSupplierLlist { get; set; }
        /// <summary>
		/// 书面推荐函
		/// </summary>
        [DisplayName("书面推荐函")]
        [MaxLength(200,ErrorMessage ="WrittenRecommendationLetter不能超过[100]字")]
		public string WrittenRecommendationLetter { get; set; }
        /// <summary>
		/// 随机抽取记录文件
		/// </summary>
        [DisplayName("随机抽取记录文件")]
        [MaxLength(200,ErrorMessage ="RandomlyExtractRecordFiles不能超过[100]字")]
		public string RandomlyExtractRecordFiles { get; set; }
        /// <summary>
		/// 抽取供应商库名称
		/// </summary>
        [DisplayName("抽取供应商库名称")]
        [MaxLength(1000,ErrorMessage ="ExtractSupplierLibraryNname不能超过[500]字")]
		public string ExtractSupplierLibraryNname { get; set; }
        /// <summary>
		/// 是否满足报名家数
		/// </summary>
        [DisplayName("是否满足报名家数")]
		public bool? IsSatisfiedBidCompanyNumber { get; set; }
        /// <summary>
		/// 投标报名家数
		/// </summary>
        [DisplayName("投标报名家数")]
		public int? BidCompanyNumber { get; set; }
        /// <summary>
		/// 缴纳投标保证金家数
		/// </summary>
        [DisplayName("缴纳投标保证金家数")]
		public int? BidCompanyWithMarginNumber { get; set; }
        /// <summary>
		/// 中标供应商
		/// </summary>
        [DisplayName("中标供应商")]
        [MaxLength(200,ErrorMessage ="WinningBidder不能超过[100]字")]
		public string WinningBidder { get; set; }
        /// <summary>
		/// 企业类型
		/// </summary>
        [DisplayName("企业类型")]
        [MaxLength(50,ErrorMessage ="TypeOfEnterprise不能超过[25]字")]
		public string TypeOfEnterprise { get; set; }
        /// <summary>
		/// 预算金额
		/// </summary>
        [DisplayName("预算金额")]
		public int? BudgetAmount { get; set; }
        /// <summary>
		/// 中标金额
		/// </summary>
        [DisplayName("中标金额")]
		public int? WinningBidAmount { get; set; }
        /// <summary>
		/// 投标文件
		/// </summary>
        [DisplayName("投标文件")]
        [MaxLength(200,ErrorMessage ="BiddingDocuments不能超过[100]字")]
		public string BiddingDocuments { get; set; }
        /// <summary>
		/// 合同类型
		/// </summary>
        [DisplayName("合同类型")]
        [MaxLength(50,ErrorMessage ="TypeOfContract不能超过[25]字")]
		public string TypeOfContract { get; set; }
        /// <summary>
		/// 律师审核意见表
		/// </summary>
        [DisplayName("律师审核意见表")]
        [MaxLength(200,ErrorMessage ="LawyersOpinionSheet不能超过[100]字")]
		public string LawyersOpinionSheet { get; set; }
        /// <summary>
		/// 校内会签记录表
		/// </summary>
        [DisplayName("校内会签记录表")]
        [MaxLength(200,ErrorMessage ="SchoolCountersignedRecordForm不能超过[100]字")]
		public string SchoolCountersignedRecordForm { get; set; }
        /// <summary>
		/// 合同审定稿
		/// </summary>
        [DisplayName("合同审定稿")]
        [MaxLength(200,ErrorMessage ="ContractApproval不能超过[100]字")]
		public string ContractApproval { get; set; }
        /// <summary>
		/// 合同签订时间
		/// </summary>
        [DisplayName("合同签订时间")]
		public DateTime? ContractSigningTime { get; set; }
        /// <summary>
		/// 采购合同附件
		/// </summary>
        [DisplayName("采购合同附件")]
        [MaxLength(200,ErrorMessage ="PurchaseContractAnnex不能超过[100]字")]
		public string PurchaseContractAnnex { get; set; }
        /// <summary>
		/// 履约验收天数
		/// </summary>
        [DisplayName("履约验收天数")]
		public int? PerformanceAcceptanceDays { get; set; }
        /// <summary>
		/// 合同公示地址
		/// </summary>
        [DisplayName("合同公示地址")]
        [MaxLength(200,ErrorMessage ="ContractPublicAddress不能超过[100]字")]
		public string ContractPublicAddress { get; set; }
        /// <summary>
		/// 合同公示网站
		/// </summary>
        [DisplayName("合同公示网站")]
        [MaxLength(200,ErrorMessage ="ContractPublicityWebsite不能超过[100]字")]
		public string ContractPublicityWebsite { get; set; }
        /// <summary>
		/// 合同公示时间
		/// </summary>
        [DisplayName("合同公示时间")]
		public DateTime? ContractOpeningTime { get; set; }
        /// <summary>
		/// 合同公示截图
		/// </summary>
        [DisplayName("合同公示截图")]
        [MaxLength(200,ErrorMessage ="ContractPublicScreeningScreenshot不能超过[100]字")]
		public string ContractPublicScreeningScreenshot { get; set; }
        /// <summary>
		/// 履约开始期限
		/// </summary>
        [DisplayName("履约开始期限")]
		public DateTime? PerformanceBeginPeriod { get; set; }
        /// <summary>
		/// 履约结束期限
		/// </summary>
        [DisplayName("履约结束期限")]
		public DateTime? PerformanceEndPeriod { get; set; }
        /// <summary>
		/// 验收时间
		/// </summary>
        [DisplayName("验收时间")]
		public DateTime? AcceptanceTime { get; set; }
        /// <summary>
		/// 履约验收信息
		/// </summary>
        [DisplayName("履约验收信息")]
        [MaxLength(1000,ErrorMessage ="PerformanceAcceptanceInformation不能超过[500]字")]
		public string PerformanceAcceptanceInformation { get; set; }
        /// <summary>
		/// 履约验收附件
		/// </summary>
        [DisplayName("履约验收附件")]
        [MaxLength(200,ErrorMessage ="PerformanceAcceptanceAnnex不能超过[100]字")]
		public string PerformanceAcceptanceAnnex { get; set; }
        /// <summary>
		/// 废包次数
		/// </summary>
        [DisplayName("废包次数")]
        [Required(ErrorMessage ="请提供[Times]")]
		public int Times { get; set; }
        /// <summary>
		/// 废包人Id
		/// </summary>
        [DisplayName("废包人Id")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 废包时间
		/// </summary>
        [DisplayName("废包时间")]
        [Required(ErrorMessage ="请提供[CreateDatetime]")]
		public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 废包原因
		/// </summary>
        [DisplayName("废包原因")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}