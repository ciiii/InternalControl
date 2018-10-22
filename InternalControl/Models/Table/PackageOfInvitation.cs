using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfInvitation[350 采购邀请中的书面邀请或供应商库随机抽取时填写的            类]
    /// </summary>
    [Serializable]
	public partial class PackageOfInvitation 
	{       
        #region 属性
        /// <summary>
		/// 包id
		/// </summary>
        [DisplayName("包id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
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
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}