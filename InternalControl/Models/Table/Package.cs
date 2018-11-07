using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Package[100时生成/编辑类]
    /// </summary>
    [Serializable]
	public partial class Package 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 申报项目Id,新增时填0
		/// </summary>
        [DisplayName("申报项目Id,新增时填0")]
        [Required(ErrorMessage ="请提供[DeclareProjectId]")]
		public int DeclareProjectId { get; set; }
        /// <summary>
		/// 预算项目Id
		/// </summary>
        [DisplayName("预算项目Id")]
        [Required(ErrorMessage ="请提供[BudgetProjectId]")]
		public int BudgetProjectId { get; set; }
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
		/// 附件
		/// </summary>
        [DisplayName("附件")]
        [MaxLength(200,ErrorMessage ="Attachment不能超过[100]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}