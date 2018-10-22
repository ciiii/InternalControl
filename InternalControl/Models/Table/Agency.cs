using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Agency[代理机构类]
    /// </summary>
    [Serializable]
	public partial class Agency 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 单位名称
		/// </summary>
        [DisplayName("单位名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(200,ErrorMessage ="Name不能超过[100]字")]
		public string Name { get; set; }
        /// <summary>
		/// 联系人编号
		/// </summary>
        [DisplayName("联系人编号")]
		public int? LinkmanId { get; set; }
        /// <summary>
		/// 联系方式
		/// </summary>
        [DisplayName("联系方式")]
        [MaxLength(50,ErrorMessage ="ContactWay不能超过[25]字")]
		public string ContactWay { get; set; }
        /// <summary>
		/// 联系电话
		/// </summary>
        [DisplayName("联系电话")]
        [MaxLength(50,ErrorMessage ="ContactNumber不能超过[25]字")]
		public string ContactNumber { get; set; }
        /// <summary>
		/// 地址
		/// </summary>
        [DisplayName("地址")]
        [MaxLength(200,ErrorMessage ="Address不能超过[100]字")]
		public string Address { get; set; }
        /// <summary>
		/// 代理方式
		/// </summary>
        [DisplayName("代理方式")]
        [MaxLength(50,ErrorMessage ="ProxyMode不能超过[25]字")]
		public string ProxyMode { get; set; }
        /// <summary>
		/// 代理开始时间
		/// </summary>
        [DisplayName("代理开始时间")]
		public DateTime? BeginDatetimeOfAgent { get; set; }
        /// <summary>
		/// 代理结束时间
		/// </summary>
        [DisplayName("代理结束时间")]
		public DateTime? EndDatetimeOfAgent { get; set; }
        /// <summary>
		/// 综合评分
		/// </summary>
        [DisplayName("综合评分")]
		public int? ComprehensiveScore { get; set; }
        
        
        #endregion
	}
}