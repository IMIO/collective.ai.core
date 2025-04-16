from openai import OpenAI

from collective.ai.core.browser.controlpanel import IAICoreSettings
from plone.memoize.forever import memoize
from plone.registry.interfaces import IRegistry
from zope.component import getUtility, adapter
from zope.interface import Interface, implementer

_MODELS_CACHE = {}


class IAIAPIService(Interface):

    def list_models(self):
        pass

    def complete(self, prompt):
        pass


@adapter(Interface)
@implementer(IAIAPIService)
class OpenAIService:
    name = "OpenAI"

    def __init__(self, context):
        registry = getUtility(IRegistry)
        self.ai_settings = registry.forInterface(IAICoreSettings, check=False)

    def __call__(self, config_row, model):
        self.service_settings = self.ai_settings.text_completion_services[config_row]
        extra_config = self.service_settings["extra_config"] or {}
        self.client = OpenAI(
            base_url=self.service_settings["api_service_url"],
            api_key=self.service_settings["api_key"],
            **extra_config
        )
        self.model = model

    def complete(self, prompt):
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return completion.choices[0].message.content

    def list_models(self):
        if self.name not in _MODELS_CACHE:
            models = self.client.models.list()
            _MODELS_CACHE[self.name] = [m.id for m in models.data]
        return _MODELS_CACHE[self.name]


@adapter(Interface)
@implementer(IAIAPIService)
class MistralAIService(OpenAIService):
    name = "Mistral AI"

    def list_models(self):
        return [
            "mistral-large-latest",
            "open-mistral-nemo",
            "codestral-latest",
            "open-mistral-7b",
            "open-mixtral-8x7b",
            "open-mixtral-8x22b",
            "open-codestral-mamba"
        ]


@adapter(Interface)
@implementer(IAIAPIService)
class OpenRouterAIService(OpenAIService):
    name = "OpenRouter"
