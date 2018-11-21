using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VPackageOfRejected[类]
    /// </summary>
    [Serializable]
	public partial class VPackageOfRejected 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        public string PackageName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ItemName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? DeclareCreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DeclareCreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? DeclareDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DeclareDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BudgetName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BudgetTypeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExecutePurchaseMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int DeclareProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BudgetProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ExecuteProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int ItemId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool IsImported { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string DeclareTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int DeclareNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int DeclareUnitPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Unit { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Attachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BudgetTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BudgetNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BudgetUnitPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BudgetAttachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? SerialNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExecuteTechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? ExecuteNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? ExecuteUnitPrice { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExecuteAttachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsMSE { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BiddingMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsAcceptCombo { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsTakeBidBond { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BidBond { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsTakePerformanceBond { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? PerformanceBond { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LinkmanPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string TermOfService { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Prerequisites { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PaymentMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string TechnicalRequirementsAttachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string TechnicalRequirements { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string GradingStandard { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExtractSupplierLlist { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string WrittenRecommendationLetter { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string RandomlyExtractRecordFiles { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ExtractSupplierLibraryNname { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsSatisfiedBidCompanyNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BidCompanyNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BidCompanyWithMarginNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string WinningBidder { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string TypeOfEnterprise { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? BudgetAmount { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? WinningBidAmount { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string BiddingDocuments { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string TypeOfContract { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LawyersOpinionSheet { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string SchoolCountersignedRecordForm { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContractApproval { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? ContractSigningTime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PurchaseContractAnnex { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? PerformanceAcceptanceDays { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContractPublicAddress { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContractPublicityWebsite { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? ContractOpeningTime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ContractPublicScreeningScreenshot { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? PerformanceBeginPeriod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? PerformanceEndPeriod { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime? AcceptanceTime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PerformanceAcceptanceInformation { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string PerformanceAcceptanceAnnex { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int Times { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        
          
        #endregion
	}
}