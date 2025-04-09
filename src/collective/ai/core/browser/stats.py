from Products.CMFCore.ActionInformation import ActionInfo
from Products.CMFCore.Expression import getExprContext
from collective.ai.core import _
from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.z3cform import layout
from zope.browserpage import ViewPageTemplateFile
from zope.publisher.browser import BrowserView


class AICoreControlPanelForm(BrowserView):
    label = _("Main AI settings")
    template = ViewPageTemplateFile("templates/content_status_history.pt")


class AICoreControlPanelFormWrapper(ControlPanelFormWrapper):
    index = ViewPageTemplateFile("controlpanel_layout.pt")

    def __init__(self, context, request):
        super().__init__(context, request)
        self.tabs = self.get_ai_controlpanel_tabs()
        self.active_tab = self.get_active_tab()

    def get_ai_controlpanel_tabs(self):
        portal_actions = api.portal.get_tool('portal_actions')
        actions = portal_actions.listActions(categories=['ai_controlpanel_tabs'])
        ec = getExprContext(self)
        actions = [ActionInfo(action, ec) for action in actions]
        return actions

    def get_active_tab(self):
        return next(filter(lambda x: x['url'].split('/')[-1] == self.request.getURL().split('/')[-1], self.tabs))


AICoreStatsView = layout.wrap_form(AICoreControlPanelForm, AICoreControlPanelFormWrapper)
