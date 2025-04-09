from pytest_plone import fixtures_factory
from collective.ai.core.testing import COLLECTIVE_AI_CORE_INTEGRATION_TESTING
from collective.ai.core.testing import COLLECTIVE_AI_CORE_FUNCTIONAL_TESTING
from collective.ai.core.testing import COLLECTIVE_AI_CORE_ACCEPTANCE_TESTING



pytest_plugins = ["pytest_plone"]


globals().update(
    fixtures_factory(
        (
            (COLLECTIVE_AI_CORE_ACCEPTANCE_TESTING, "acceptance"),
            (COLLECTIVE_AI_CORE_FUNCTIONAL_TESTING, "functional"),
            (COLLECTIVE_AI_CORE_INTEGRATION_TESTING, "integration"),
        )
    )
)
