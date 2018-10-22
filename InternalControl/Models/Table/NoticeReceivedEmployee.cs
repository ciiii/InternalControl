using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// NoticeReceivedEmployee[通知公告已接收人类]
    /// </summary>
    [Serializable]
	public partial class NoticeReceivedEmployee 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 通知公告编号
		/// </summary>
        [DisplayName("通知公告编号")]
        [Required(ErrorMessage ="请提供[NoticeId]")]
		public int NoticeId { get; set; }
        /// <summary>
		/// 接收人编号
		/// </summary>
        [DisplayName("接收人编号")]
        [Required(ErrorMessage ="请提供[EmployeeId]")]
		public int EmployeeId { get; set; }
        
        
        #endregion
	}
}