using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// NoticeReceivingCondition[通知公告接收条件   接收者类型:   0 所有人  该情况下,接收者编号也=0   10 人员   20 部门   30 角色类]
    /// </summary>
    [Serializable]
	public partial class NoticeReceivingCondition 
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
		/// 接受者类型
		/// </summary>
        [DisplayName("接受者类型")]
        [Required(ErrorMessage ="请提供[Type]")]
		public int Type { get; set; }
        /// <summary>
		/// 接受者编号
		/// </summary>
        [DisplayName("接受者编号")]
        [Required(ErrorMessage ="请提供[ReceiverId]")]
		public int ReceiverId { get; set; }
        
        
        #endregion
	}
}