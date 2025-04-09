# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live."""
from plone.autoform.interfaces import IFormFieldProvider
from zope.interface import Interface
from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class ICollectiveAICoreLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""

class ICollectiveAIControlPanelFieldProvider(IFormFieldProvider):
    pass

class IAIActionsProvider(Interface):
    def __call__(self, context, request):
        pass
