using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Notice[通知公告类]
    /// </summary>
    [Serializable]
	public partial class Notice 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 通知类型
		/// </summary>
        [DisplayName("通知类型")]
        [Required(ErrorMessage ="请提供[Type]")]
        [MaxLength(100,ErrorMessage ="Type不能超过[50]字")]
		public string Type { get; set; }
        /// <summary>
		/// 发送人编号
		/// </summary>
        [DisplayName("发送人编号")]
        [Required(ErrorMessage ="请提供[SendorId]")]
		public int SendorId { get; set; }
        /// <summary>
		/// 通知名称
		/// </summary>
        [DisplayName("通知名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 相关文件路径
		/// </summary>
        [DisplayName("相关文件路径")]
        [MaxLength(500,ErrorMessage ="FilePath不能超过[250]字")]
		public string FilePath { get; set; }
        /// <summary>
		/// 通知内容
		/// </summary>
        [DisplayName("通知内容")]
		public string Content { get; set; }
        /// <summary>
		/// 是否启用
		/// </summary>
        [DisplayName("是否启用")]
        [Required(ErrorMessage ="请提供[IsEnabled]")]
		public bool IsEnabled { get; set; }
        /// <summary>
		/// 建立时间
		/// </summary>
        [DisplayName("建立时间")]
		public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}