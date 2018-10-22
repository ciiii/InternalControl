using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Expert[专家类]
    /// </summary>
    [Serializable]
	public partial class Expert 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 姓名
		/// </summary>
        [DisplayName("姓名")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(50,ErrorMessage ="Name不能超过[25]字")]
		public string Name { get; set; }
        /// <summary>
		/// 专业品目编号
		/// </summary>
        [DisplayName("专业品目编号")]
        [MaxLength(50,ErrorMessage ="ItemName不能超过[25]字")]
		public string ItemName { get; set; }
        /// <summary>
		/// 职称
		/// </summary>
        [DisplayName("职称")]
        [MaxLength(50,ErrorMessage ="Title不能超过[25]字")]
		public string Title { get; set; }
        /// <summary>
		/// 所在单位
		/// </summary>
        [DisplayName("所在单位")]
        [MaxLength(200,ErrorMessage ="Company不能超过[100]字")]
		public string Company { get; set; }
        /// <summary>
		/// 联系方式
		/// </summary>
        [DisplayName("联系方式")]
        [MaxLength(50,ErrorMessage ="Phone不能超过[25]字")]
		public string Phone { get; set; }
        /// <summary>
		/// 是否本单位
		/// </summary>
        [DisplayName("是否本单位")]
		public bool? IsOurCompany { get; set; }
        /// <summary>
		/// 部门编号
		/// </summary>
        [DisplayName("部门编号")]
		public int? DepartmentId { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}