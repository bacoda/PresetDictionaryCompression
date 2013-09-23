/**
 * @author swannc
 */

var __espn_conversation_widget__ = function()
{	
	var ConversationWidget = Class.create();
	ConversationWidget.prototype = {
		initialize: function()
		{
			this.options = this.construct_options();
			
			this.render(this.parse_data(this.load_data()));
		},
		load_data: function()
		{
			return ProsperoResponse;	
		},
		get_template: function()
		{
			if(this.template) return this.template;
			
			this.template = new Template('<li><h3><a href="#{@contentURL}">#{@subject}</a> <small>(#{@messageCount})</small></h3></li>');
			return this.template;
		},
		parse_data: function(data)
		{
			var html = '<div class="mc-widget">';
			var items = data.ContentElement.Forum[0].Folder[0].Discussion;
			
			if(this.options.mc_sort == 'comments')
			{
				items = items.sort(function(a,b)
				{
					return parseInt(b['@messageCount']) - parseInt(a['@messageCount']);
				});
			}
			
			if(!this.options.mc_omit_title) html += '<h2>Hottest Conversations on ESPN.com</h2>';
			
			html += '<ul>';
			items.each(function(item,count)
			{
				var seperator = item['@contentURL'].indexOf('?') == -1 ? '?' : '&';
				item['@subject'] = item['@subject'].truncate(this.options.mc_truncate_after);
				item['@contentURL'] = conversation_url( item );
				if( this.options.mc_append_to_link ) item['@contentURL'] += ( seperator + this.options.mc_append_to_link );
				html += this.get_template().evaluate(item);
			}.bind(this));
			
			html += '</ul>';
			html += '</div>';
			
			return html;
		},
		render: function(html)
		{
			if(this.options.mc_attach_point)
			{
				Event.onDOMReady(function(){$(this.options.mc_attach_point).update(html);}.bind(this));	
			}
			else
			{
				document.write(html);
			}
		},
		construct_options: function()
		{
			var options = {};
			var vars = {
				mc_omit_title: false,
				mc_attach_point: null,
				mc_sort: 'hot',
				mc_append_to_link: null,
				mc_truncate_after: 32
			};
			
			for(var i in vars)
			{
				options[i] = (window[i] === null || window[i] === undefined) ? vars[i] : window[i];	
			}
			
			return options;
		}
	};
	
	new ConversationWidget;
}();
