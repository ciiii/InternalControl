using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// 执行项目的过滤条件
    /// </summary>
    public class ExecuteProjectFilter
    {
        /// <summary>
        /// 0未完成
        /// 1-已完成
        /// -2 - 废标
        /// </summary>
        public int? State { get; set; }

        /// <summary>
        /// 模糊:执行项目名称
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 项目类型
        /// </summary>
        public string ProjectType { get; set; }

        /// <summary>
        /// 是否集采
        /// </summary>
        public bool? IsCenterPurchase { get; set; }

        /// <summary>
        /// 是否政府采购
        /// </summary>
        public bool? IsGovernmentPurchase { get; set; }

        /// <summary>
        /// 采购方式
        /// </summary>
        public string PurchaseMethod { get; set; }

        /// <summary>
        /// 执行时的合并分类
        /// </summary>
        public string MergeTypeWhenExecute { get; set; }

        /// <summary>
        /// 年份,必须确定年份
        /// </summary>
        [Required]
        public int Year { get; set; }

        /// <summary>
        /// 归口部门id
        /// </summary>
        public int? RelevantDepartmentId { get; set; }
    }

    //public class ExecuteProjectExtendFilter: ExecuteProjectFilter
    //{
    //    /// <summary>
    //    /// 归口部门id,后台来确定;
    //    /// </summary>
    //    public int? RelevantDepartmentId { get; set; }
    //}

    /// <summary>
    /// 执行大页面左侧的菜单项
    /// </summary>
    public class MenuOfExecuteProject
    {
        /// <summary>
        /// 菜单的中文名称
        /// </summary>
        public string StepTemplateName { get; set; }
        /// <summary>
        /// 是否执行过了包括正在执行
        /// </summary>
        public bool IsPassed { get; set; }
        /// <summary>
        /// 是否正在执行
        /// </summary>
        public bool ISCurrentStepTemplate { get; set; }
        /// <summary>
        /// 当前登录人是否可以执行
        /// </summary>
        public bool IsCanOperate { get; set; }
    }

    /// <summary>
    /// 执行项目相关包的过滤条件
    /// </summary>
    public class PackageFilter
    {
        /// <summary>
        /// 使用in搜索多项符合条件的结果
        /// </summary>
        public string WhereInExecuteProjectId { get; set; }

        /// <summary>
        /// 使用in搜索多项符合=Id条件的结果
        /// </summary>
        public string WhereInId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? BudgetProjectId { get; set; }

        /// <summary>
        /// 执行项目编号作为筛选条件
        /// </summary>
        public int? ExecuteProjectId { get; set; }
    }

    /// <summary>
    /// 消息结果完成时提交的接口数据结构
    /// </summary>
    public class ModelOfPassExecuteProjectOfResultNotice
    {
        /// <summary>
        /// 消息结果的主体数据
        /// </summary>
        public ExecuteProjectOfResultNotice ModelOfExecuteProjectOfResultNotice { get; set; }

        /// <summary>
        /// 消息结果包的信息
        /// </summary>
        public IEnumerable<PackageOfResultNotice> ListOfPackageOfResultNotice { get; set; }

        /// <summary>
        /// 这次废包的id的信息
        /// </summary>
        public IEnumerable<int> ListOfRejectPackageId { get; set; }
    }

    /// <summary>
    /// 执行项目的项目信息的多个组成部分;
    /// </summary>
    public class MultiPartOfExecuteProject
    {
        /// <summary>
        /// 300 执行项目基础信息
        /// </summary>
        public VTFNExecuteProject ExecuteProject { get; set; }

        /// <summary>
        /// 310 执行方式
        /// </summary>
        public VExecuteProjectOfGetRunMode ExecuteProjectOfGetRunMode { get; set; }

        /// <summary>
        /// 330 执行论证,(302没有项目信息,只有包信息)
        /// </summary>
        public ExecuteProjectOfArgument ExecuteProjectOfArgument { get; set; }

        /// <summary>
        /// 340 采购确认
        /// </summary>
        public ExecuteProjectOfConfirm ExecuteProjectOfConfirm { get; set; }

        /// <summary>
        /// 350 采购邀请
        /// </summary>
        public ExecuteProjectOfInvitation ExecuteProjectOfInvitation { get; set; }

        /// <summary>
        /// 360 开标评标
        /// </summary>
        public ExecuteProjectOfBidEvaluation ExecuteProjectOfBidEvaluation { get; set; }

        /// <summary>
        /// 370 专家抽取
        /// </summary>
        public IEnumerable<VExecuteProjectExperts> ExecuteProjectExperts { get; set; }

        /// <summary>
        /// 380 结果公示 结果信息
        /// </summary>
        public ExecuteProjectOfResultNotice ExecuteProjectOfResultNotice { get; set; }

        /// <summary>
        /// 质疑投诉
        /// </summary>
        public IEnumerable<ExecuteProjectOfQuestion> ExecuteProjectOfQuestion { get; set; }

        /// <summary>
        /// 更正情况
        /// </summary>
        public IEnumerable<ExecuteProjectOfCorrection> ExecuteProjectOfCorrection { get; set; }
    }

    /// <summary>
    /// 执行项目的包的多个组成部分
    /// </summary>
    public class MultiPartOfExecutePackage
    {
        /// <summary>
        /// 基本的执行包的信息
        /// </summary>
        public IEnumerable<VTFNPackageOfExcuteBudget> PackageOfExcuteBudget { get; set; }

        /// <summary>
        /// 320 技术确认的包
        /// </summary>
        public IEnumerable<PackageOfTechnicalConfirmation> PackageOfTechnicalConfirmation { get; set; }

        /// <summary>
        /// 350 采购邀请的包
        /// </summary>
        public IEnumerable<PackageOfInvitation> PackageOfInvitation { get; set; }

        /// <summary>
        /// 360 开标评标的包
        /// </summary>
        public IEnumerable<PackageOfBidEvaluation> PackageOfBidEvaluation { get; set; }

        /// <summary>
        /// 380 结果信息的包
        /// </summary>
        public IEnumerable<PackageOfResultNotice> PackageOfResultNotice { get; set; }

        /// <summary>
        /// 381 拟定合同的包
        /// </summary>
        public IEnumerable<PackageOfDrawUpContract> PackageOfDrawUpContract { get; set; }

        /// <summary>
        /// 382 合同签订的包
        /// </summary>
        public IEnumerable<PackageOfContractSigning> PackageOfContractSigning { get; set; }

        /// <summary>
        /// 383 合同公示的包
        /// </summary>
        public IEnumerable<PackageOfContractPublicity> PackageOfContractPublicity { get; set; }

        /// <summary>
        /// 384 履约验收的包
        /// </summary>
        public IEnumerable<PackageOfAcceptanceCheckAndAcceptance> PackageOfAcceptanceCheckAndAcceptance { get; set; }
    }

    /// <summary>
    /// 执行项目详情的数据结构
    /// </summary>
    public class DetailOfExecuteProject
    {
        /// <summary>
        /// 执行项目的项目信息,有多个组成部分,随着流程推进而丰满
        /// </summary>
        public MultiPartOfExecuteProject ExecuteProject { get; set; }

        /// <summary>
        /// 执行项目的包的信息,多个组成部分
        /// </summary>
        public MultiPartOfExecutePackage ExecutePackage { get; set; }

        /// <summary>
        /// 废包列表
        /// </summary>
        public IEnumerable<VPackageOfRejected> RejectedPackage { get; set; }

        /// <summary>
        /// 左侧树的数据
        /// </summary>
        public IEnumerable<MenuOfExecuteProject> Menu { get; set; }
    }

    /// <summary>
    /// 更正时的接口数据结构
    /// </summary>
    public class DataOfExecuteProjectOfCorrection
    {
        /// <summary>
        /// 更正的主体数据
        /// </summary>
        public ExecuteProjectOfCorrection ModelOfExecuteProjectOfCorrection { get; set; }

        /// <summary>
        /// 更正包的信息
        /// </summary>
        public IEnumerable<PackageOfResultNoticeOfCorrection> ListOfPackageOfResultNoticeOfCorrection { get; set; }

        /// <summary>
        /// 这次废包的id的信息
        /// </summary>
        public IEnumerable<int> ListOfRejectPackageId { get; set; }
    }

    /// <summary>
    /// 更正中的结果信息的包的信息的搜索条件
    /// </summary>
    public class PackageOfResultNoticeOfCorrectionFilter
    {
        /// <summary>
        /// 归属的更正id
        /// </summary>
        public int? ExecuteProjectOfCorrectionId { get; set; }
    }

    /// <summary>
    /// 增改专家抽取
    /// </summary>
    public class EMExecuteProjectExperts
    {
        /// <summary>
        /// 执行项目id
        /// </summary>
        public int ExecuteProjectId { get; set; }

        /// <summary>
        /// 正选专家id列表
        /// </summary>
        public IEnumerable<int> IdListOfExecuteProjectExperts { get; set; }

        /// <summary>
        /// 备选专家id列表
        /// </summary>
        public IEnumerable<int> BackupIdListOfExecuteProjectExperts { get; set; }
    }
}